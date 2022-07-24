-- CreateTable
CREATE TABLE "parking_spots" (
    "id" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parking_spots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt" (
    "id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "parking_spot_id" TEXT NOT NULL,
    "total_value" DECIMAL(65,30),
    "check_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOut" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parking_spots_identification_key" ON "parking_spots"("identification");

-- CreateIndex
CREATE UNIQUE INDEX "receipt_vehicle_id_key" ON "receipt"("vehicle_id");

-- CreateIndex
CREATE UNIQUE INDEX "receipt_parking_spot_id_key" ON "receipt"("parking_spot_id");

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_parking_spot_id_fkey" FOREIGN KEY ("parking_spot_id") REFERENCES "parking_spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
