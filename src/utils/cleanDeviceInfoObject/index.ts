import { DeviceInfo } from "@capacitor/device";

const cleanDeviceInfoObject = (
    deviceInfo: DeviceInfo | undefined
): DeviceInfo | undefined => {
    if (deviceInfo !== undefined || deviceInfo !== null) {
        // @ts-expect-error
        delete deviceInfo?.webViewVersion;
        // @ts-expect-error
        delete deviceInfo?.isVirtual;
        delete deviceInfo?.memUsed;
        delete deviceInfo?.realDiskFree;
        delete deviceInfo?.realDiskTotal;

        return deviceInfo;
    }
};

export default cleanDeviceInfoObject;
