import { Request, Response } from "express";
import csv from 'csv-parser';
import fs from 'node:fs';
import path from "node:path";
import prisma from "../db";
import { Transaction } from "../types/Transaction";
import { Item } from "../types/Item";
import { Customer } from "../types/Customer";
import { Location } from "../types/Location";

// TODO: REMOVE AFTER GLOBAL MIDDLEWARE INSERTION
import jwt from 'jsonwebtoken';
import { secret } from "../config";
import { PrismaClientOptions } from "@prisma/client/runtime";
import { makePrismaQuery } from "../helpers/makePrismaQuery";
import restoreTypesFromString from "../helpers/restoreTypesFromString";

export default async function uploadData(request: Request, response: Response) {
  try {
    const upload = request.file?.path;
    const target = JSON.parse(request.body.data).target as string;
    const csvParseResults = [] as Transaction[] | Item[] | Location[] | Customer[];
    const fullPath = path.join(__dirname, `..\\${upload}`);

    // TODO: REMOVE AND EDIT AFTER GLOBAL MIDDLEWARE INSERTION
    const token = request.cookies.token;
    const decrypt = jwt.verify(token, `${secret}`) as { id: string };
    const userId = decrypt.id;

    // LOOK FOR uploads DIRECTORY IN THE ROOT SERVER DIRECTORY
    fs.createReadStream(fullPath)
      .pipe(csv())
      .on("data", (data) => {
        // ISSUE: csv-parser TURNS EVERYTHING INTO STRINGS
        // BUT SOME FIELDS EXPECT NUMBERS AND BOOLEANS
        csvParseResults.push(restoreTypesFromString(data));
      })
      .on("end", async () => {
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