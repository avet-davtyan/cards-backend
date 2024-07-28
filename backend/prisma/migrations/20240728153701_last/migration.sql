-- CreateTable
CREATE TABLE "CrudUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "CrudUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "price" INTEGER NOT NULL,
    "cardTypeId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "user_id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "UsersCards" (
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "UsersCards_pkey" PRIMARY KEY ("userId","cardId")
);

-- CreateTable
CREATE TABLE "CardType" (
    "id" SERIAL NOT NULL,
    "typeDescription" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "CardType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_cardTypeId_fkey" FOREIGN KEY ("cardTypeId") REFERENCES "CardType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersCards" ADD CONSTRAINT "UsersCards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersCards" ADD CONSTRAINT "UsersCards_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
