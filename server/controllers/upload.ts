import { Request, Response } from "express";
import csv from 'csv-parser';
import fs from 'node:fs';
import path from "node:path";
import { Transaction } from "../types/Transaction";
import { Item } from "../types/Item";
import { Customer } from "../types/Customer";
import { Location } from "../types/Location";

// TODO: REMOVE AFTER GLOBAL MIDDLEWARE INSERTION
// import jwt from 'jsonwebtoken';
// import { secret } from "../config";

import { makePrismaQuery } from "../helpers/makePrismaQuery";
import restoreTypesFromString from "../helpers/restoreTypesFromString";

// TODO: BYTE ORDER MARK IN UTF-8 FILES CAN CRASH THE UPLOAD
// THIS PACKAGE SHOULD HELP BUT DOES NOT WORK IN ES6 ENVIRONMENT
// import stripBomStream from 'strip-bom-stream';

export default async function uploadData(request: Request, response: Response) {
  try {
    const upload = request.file?.path;
    console.log(request.file);
    const target = JSON.parse(request.body.data).target as string;
    console.log('target', target, 'path', upload);
    const csvParseResults = [] as Transaction[] | Item[] | Location[] | Customer[];
    const fullPath = path.join(__dirname, `..\\${upload}`);

    // TODO: REMOVE AND EDIT AFTER GLOBAL MIDDLEWARE INSERTION
    // const token = request.cookies.token;
    // const decrypt = jwt.verify(token, `${secret}`) as { id: string };
    // const userId = decrypt.id;
    const userId = request.body.userId;

    // LOOK FOR uploads DIRECTORY IN THE ROOT SERVER DIRECTORY
    fs.createReadStream(fullPath)
      // .pipe(stripBomStream())
      .pipe(csv())
      .on("data", (data) => {
        // ISSUE: csv-parser TURNS EVERYTHING INTO STRINGS
        // BUT SOME FIELDS EXPECT NUMBERS AND BOOLEANS
        // console.log('after parsing', data);
        csvParseResults.push(restoreTypesFromString(data));
      })
      .on("end", async () => {
        console.log(csvParseResults[0]);
        let keys = Object.keys(csvParseResults[0]);
        let values = Object.values(csvParseResults[0]);
        // console.log(values);
        for (let i = 0; i < keys.length; i++) {
          console.log(keys[i], values[i], typeof values[i])
        }

        const createMany = await makePrismaQuery({
          keyword: "create",
          userID: `${userId}`,
          query: {
            data: csvParseResults
          },
          table: target
        });
        const deleteFile = fs.unlink(fullPath, (error) => {
          if (error) throw error;
        });
        response.status(201);
        response.send({ message: "OK!" });
      });
  } catch (error) {
    console.error(error);
    response.status(500);
    response.send({ message: "Failed to upload data" });
  };
};