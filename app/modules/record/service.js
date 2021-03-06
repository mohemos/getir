import { ValidationError } from "iyasunday";
import { client } from "../../utils/db";

export const getRecord = async ({ startDate, endDate, minCount, maxCount }) => {
  const formattedStartDate = new Date(startDate);
  const formattedEndDate = new Date(endDate);

  if (formattedStartDate.getTime() > formattedEndDate.getTime())
    throw new ValidationError(
      "Kindly ensure start date(startDate) is not greater than end date(endDate)"
    );
  if (minCount > maxCount)
    throw new ValidationError(
      "Kindly ensure minimum count(minCount) is not greater than maximum count(maxCount)"
    );

  const pipeline = [
    {
      $match: {
        $and: [
          { createdAt: { $gte: formattedStartDate } },
          { createdAt: { $lte: formattedEndDate } },
        ],
      },
    },
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: { $sum: "$counts" },
      },
    },
    {
      $match: {
        $and: [
          { totalCount: { $gte: minCount } },
          { totalCount: { $lte: maxCount } },
        ],
      },
    },
  ];

  const records = await client
    .db()
    .collection("records")
    .aggregate(pipeline)
    .toArray();

  return {
    code: 0,
    msg: "Success",
    records,
  };
};
