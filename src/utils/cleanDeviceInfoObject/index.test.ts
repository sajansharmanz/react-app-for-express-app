import { Device, DeviceInfo } from "@capacitor/device";

import cleanDeviceInfoObject from ".";

let deviceInfo: DeviceInfo;
let cleanDeviceInfo: DeviceInfo;

describe("cleanDeviceInfoObject", () => {
    beforeAll(async () => {
        deviceInfo = await Device.getInfo();

        cleanDeviceInfo = Object.assign({}, deviceInfo);
        // @ts-expect-error
        delete cleanDeviceInfo?.webViewVersion;
        // @ts-expect-error
        delete cleanDeviceInfo?.isVirtual;
        delete cleanDeviceInfo?.memUsed;
        delete cleanDeviceInfo?.realDiskFree;
    });

    it("should return clean device info as expected", () => {
        expect(cleanDeviceInfoObject(deviceInfo)).toEqual(cleanDeviceInfo);
    });

    it("should return undefined if no device info passed", () => {
        expect(cleanDeviceInfoObject(undefined)).toBeUndefined();
    });
});
