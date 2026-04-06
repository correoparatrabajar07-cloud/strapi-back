export type Device = {
  id: string;
  name: string;
  width: string;
  height: string;
};

export function useDeviceSelector() {

  const devices: Device[] = [

    {
      id: "desktop",
      name: "Desktop",
      width: "100%",
      height: "900px",
    },

    {
      id: "laptop",
      name: "Laptop",
      width: "1366px",
      height: "768px",
    },

    {
      id: "tablet",
      name: "Tablet",
      width: "768px",
      height: "1024px",
    },

    {
      id: "ipad-pro",
      name: "iPad Pro",
      width: "1024px",
      height: "1366px",
    },

    {
      id: "mobile",
      name: "Mobile",
      width: "375px",
      height: "667px",
    },

    {
      id: "iphone-se",
      name: "iPhone SE",
      width: "375px",
      height: "667px",
    },

    {
      id: "iphone-14",
      name: "iPhone 14",
      width: "390px",
      height: "844px",
    },

    {
      id: "galaxy-s20",
      name: "Galaxy S20",
      width: "360px",
      height: "800px",
    }

  ];

  const defaultDevice = devices[0];

  const handleDeviceChange = (
    id: string,
    setSelectedDevice: (device: Device) => void
  ) => {

    const device = devices.find(d => d.id === id);

    if (device) setSelectedDevice(device);

  };

  return {

    devices,

    defaultDevice,

    handleDeviceChange,

    isMobileApp: false

  };

}