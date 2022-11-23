-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "docid" TEXT NOT NULL,
    "create_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "isPosted" BOOLEAN NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_docid_key" ON "post"("docid");
