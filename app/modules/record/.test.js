import { postContent } from "iyasunday";
require("dotenv").config();

const url = process.env.TEST_URL;

test("Invalid date format", async () => {
  try {
    const { code } = await postContent({
      url,
      data: {
        startDate: "10-2015-26",
        endDate: "2018-02-02",
        minCount: 2700,
        maxCount: 3000,
      },
    });
    expect(code).not.toBe(0);
  } catch ({ code, msg, error }) {
    expect(code).toBe(400);
  }
});

test("Missing required field", async () => {
  try {
    const { code } = await postContent({
      url,
      data: {
        endDate: "2018-02-02",
        minCount: 2700,
        maxCount: 3000,
      },
    });
    expect(code).not.toBe(0);
  } catch ({ code, msg, error }) {
    expect(code).toBe(400);
  }
});

test("startDate should not be greater than endDate", async () => {
  try {
    const { code } = await postContent({
      url,
      data: {
        startDate: "2018-02-02",
        endDate: "2015-02-02",
        minCount: 2700,
        maxCount: 3000,
      },
    });

    expect(code).not.toBe(0);
  } catch ({ code, msg, error }) {
    expect(code).toBe(400);
  }
});

test("minCount should not be greater than maxCount", async () => {
  try {
    const { code } = await postContent({
      url,
      data: {
        startDate: "2015-01-02",
        endDate: "2015-03-02",
        minCount: 5000,
        maxCount: 3000,
      },
    });

    expect(code).not.toBe(0);
  } catch ({ code, msg, error }) {
    expect(code).toBe(400);
  }
});

test("Filter by all valid and required data", async () => {
  const { code, msg, records } = await postContent({
    url,
    data: {
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 2700,
      maxCount: 3000,
    },
  });

  expect(code).toBe(0);
  expect(msg.toLowerCase()).toBe("success");
  expect(Array.isArray(records)).toBe(true);
});
