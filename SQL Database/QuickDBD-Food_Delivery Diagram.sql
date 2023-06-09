-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/XCVyWi
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Restaurant" (
    "Restaurant_Name" varchar(255)   NOT NULL,
    "Rating" BOOLEAN   NOT NULL,
    "Category" varchar(255)   NOT NULL,
    "Address" varchar(255)   NOT NULL
);

