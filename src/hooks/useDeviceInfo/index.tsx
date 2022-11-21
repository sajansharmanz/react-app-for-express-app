import { Device, DeviceInfo } from "@capacitor/device";
import { useEffect, useState } from "react";

const useDeviceInfo = (): DeviceInfo | undefined => {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | undefined>();

    useEffect(() => {
        const fetchDeviceInfo = async (): Promise<void> => {
            const info = await Device.getInfo();
            setDeviceInfo(info);
        };

        void fetchDeviceInfo();
    }, []);

    return deviceInfo;
};

export default useDeviceInfo;
