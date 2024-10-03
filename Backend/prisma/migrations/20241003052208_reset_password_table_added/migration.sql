-- CreateTable
CREATE TABLE "resetPasswordCodes" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "user_phone" TEXT NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resetPasswordCodes_pkey" PRIMARY KEY ("id")
);
