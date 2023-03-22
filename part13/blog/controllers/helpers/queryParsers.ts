import { Request } from "express";
import { Op } from "sequelize";
interface BlogQueryParams {
  [Op.or]?: [
    { title: { [Op.like]: string } },
    { author: { [Op.like]: string } }
  ];
}

const blogQueryParser = (reqQueries: Request["query"]): object => {
  let where: BlogQueryParams = {};
  if (reqQueries.search && typeof reqQueries.search === "string") {
    where = {
      [Op.or]: [
        { title: { [Op.like]: `%${reqQueries.search}%`.toString() } },
        { author: { [Op.like]: `%${reqQueries.search}%`.toString() } },
      ],
    };
  }
  return where;
};

export { blogQueryParser };
