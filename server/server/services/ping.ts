import ping from 'ping';
import deviceService from '../api/device/device.service';

export const pingDevices = async () => {
    const devices = await deviceService.getAllDevices();

    devices?.forEach(async (device) => {
        const res = await ping.promise.probe(device.host);
        if (res.alive) {
            await deviceService.updateDeviceInfo(device.id, 'Connected', 0);
        } else {
            await deviceService.updateDeviceInfo(device.id, 'Disconnected', device.disc_time + 60);
        }
    } );
}
