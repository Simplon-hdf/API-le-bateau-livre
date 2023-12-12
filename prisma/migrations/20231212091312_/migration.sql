-- CreateTable
CREATE TABLE "Books" (
    "book_UUID" VARCHAR(36) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" VARCHAR(30) NOT NULL,
    "author_UUID" TEXT NOT NULL,
    "borrow_UUID" TEXT,

    CONSTRAINT "books_pk" PRIMARY KEY ("book_UUID")
);

-- CreateTable
CREATE TABLE "Borrows" (
    "borrow_UUID" CHAR(36) NOT NULL,
    "status" INTEGER NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL,
    "borrower_UUID" CHAR(36) NOT NULL,
    "employee_UUID" CHAR(36) NOT NULL,

    CONSTRAINT "borrows_pk" PRIMARY KEY ("borrow_UUID")
);

-- CreateTable
CREATE TABLE "Authors" (
    "author_UUID" VARCHAR(36) NOT NULL,
    "humanInformation_UUID" TEXT NOT NULL,

    CONSTRAINT "authors_pk" PRIMARY KEY ("author_UUID")
);

-- CreateTable
CREATE TABLE "Borrowers" (
    "borrower_UUID" CHAR(36) NOT NULL,
    "humanInformation_UUID" TEXT NOT NULL,

    CONSTRAINT "borrowers_pk" PRIMARY KEY ("borrower_UUID")
);

-- CreateTable
CREATE TABLE "Employees" (
    "employee_UUID" CHAR(36) NOT NULL,
    "mail_address" CHAR(80) NOT NULL,
    "password" CHAR(72) NOT NULL,
    "humanInformation_UUID" TEXT NOT NULL,

    CONSTRAINT "employees_pk" PRIMARY KEY ("employee_UUID")
);

-- CreateTable
CREATE TABLE "HumanInformations" (
    "humanInformation_UUID" VARCHAR(36) NOT NULL,
    "first_name" VARCHAR(20) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "humansinformations_pk" PRIMARY KEY ("humanInformation_UUID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_book_UUID_key" ON "Books"("book_UUID");

-- CreateIndex
CREATE UNIQUE INDEX "Borrows_borrow_UUID_key" ON "Borrows"("borrow_UUID");

-- CreateIndex
CREATE UNIQUE INDEX "Authors_author_UUID_key" ON "Authors"("author_UUID");

-- CreateIndex
CREATE UNIQUE INDEX "Borrowers_borrower_UUID_key" ON "Borrowers"("borrower_UUID");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_employee_UUID_key" ON "Employees"("employee_UUID");

-- CreateIndex
CREATE UNIQUE INDEX "HumanInformations_humanInformation_UUID_key" ON "HumanInformations"("humanInformation_UUID");

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "author_fk" FOREIGN KEY ("author_UUID") REFERENCES "Authors"("author_UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "borrow_fk" FOREIGN KEY ("borrow_UUID") REFERENCES "Borrows"("borrow_UUID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrows" ADD CONSTRAINT "borrowers_fk" FOREIGN KEY ("borrow_UUID") REFERENCES "Borrowers"("borrower_UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrows" ADD CONSTRAINT "employees_fk" FOREIGN KEY ("employee_UUID") REFERENCES "Employees"("employee_UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authors" ADD CONSTRAINT "humansinformation_fk" FOREIGN KEY ("humanInformation_UUID") REFERENCES "HumanInformations"("humanInformation_UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowers" ADD CONSTRAINT "humansinformation_fk" FOREIGN KEY ("humanInformation_UUID") REFERENCES "HumanInformations"("humanInformation_UUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_humanInformation_UUID_fkey" FOREIGN KEY ("humanInformation_UUID") REFERENCES "HumanInformations"("humanInformation_UUID") ON DELETE RESTRICT ON UPDATE CASCADE;
