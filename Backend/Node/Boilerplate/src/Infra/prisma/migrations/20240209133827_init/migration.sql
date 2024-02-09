-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Fleet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owner_id" INTEGER NOT NULL,
    CONSTRAINT "Fleet_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vehicule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "longitude" TEXT,
    "latitude" TEXT
);

-- CreateTable
CREATE TABLE "_FleetToVehicule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FleetToVehicule_A_fkey" FOREIGN KEY ("A") REFERENCES "Fleet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FleetToVehicule_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicule" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Fleet_owner_id_key" ON "Fleet"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicule_plate_key" ON "Vehicule"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "_FleetToVehicule_AB_unique" ON "_FleetToVehicule"("A", "B");

-- CreateIndex
CREATE INDEX "_FleetToVehicule_B_index" ON "_FleetToVehicule"("B");
