const { createBluetooth } = require("node-ble");
const { bluetooth, destroy } = createBluetooth();

async function test() {
  console.log("Starting discovery...");

  const adapter = await bluetooth.defaultAdapter();
  const adapteraddress = await adapter.getAddress();
  console.log("Using adapter: " + adapteraddress);

  if (!(await adapter.isDiscovering())) await adapter.startDiscovery();

  console.log("Waiting for device...");

  const device = await adapter.waitDevice("4C:EB:D6:4D:61:32");
  await device.connect();
  const gattServer = await device.gatt();

  const deviceAddress = await device.getAddress();
  console.log("Connected to device: " + deviceAddress);

  const availableServices = await gattServer.services();
  console.log(availableServices);

  const service1 = await gattServer.getPrimaryService(
    "19b10000-e8f2-537e-4f6c-d104768a1214"
  );

  const availableCharacteristics = await service1.characteristics();
  console.log(availableCharacteristics);

  while (true) {
    let characteristic1 = await service1.getCharacteristic(
      "19b10001-e8f2-537e-4f6c-d104768a1214"
    );
    let buffer = await characteristic1.readValue();
    let buffer2 = await characteristic1.rawListeners();
    console.log(buffer.toString("ascii"));
    console.log(buffer2);
  }
}

test();
