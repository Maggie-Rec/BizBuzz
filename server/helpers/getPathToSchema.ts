import path from 'path';

export function getPathToSchema() {
  return path.join(__dirname.slice(0, __dirname.lastIndexOf('server')),
    '/server/prisma/schema.prisma')
}
