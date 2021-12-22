import Device, { IDevice } from './device.model';

const getAllDevices = async (): Promise<IDevice[] | null> => Device.find({});

const getAllDevicesforUser = async (
    userId: string
): Promise<IDevice[] | null> => Device.find({user: userId}).populate('User');

const addNewDevice = async (device: IDevice): Promise<IDevice> => {
    const newDevice = new Device(device);
    return newDevice.save();
}

const getDeviceByName = async (
    name : string,
    userId: string
): Promise<IDevice | null> => Device.findOne({ name, user: userId });

const updateDeviceInfoForUser = async (
    id: string,
    device: IDevice,
    userId: string
): Promise<IDevice | null> => Device.findOneAndUpdate(
    { _id: id, user: userId }, device, { new: true });

const updateDeviceInfo = async (
    id: string,
    status: string,
    disc_time: number,
): Promise<IDevice | null> => Device.findOneAndUpdate(
    { _id: id },
    { status, disc_time },
    { new: true }
);

const deleteDevice = async (id: string, userId: string): Promise<IDevice | null> =>
    Device.findOneAndDelete({ _id: id, user: userId });


export default {
    getAllDevices,
    getAllDevicesforUser,
    addNewDevice,
    getDeviceByName,
    updateDeviceInfo,
    updateDeviceInfoForUser,
    deleteDevice
};
