import React, { useRef, useState, useEffect } from "react";
import { Box, Flex } from "@strapi/design-system";
import { useSearchParams } from "react-router-dom";

import { useDeviceSelector } from "./utils/hooks";

const PreviewProxy = () => {
  const iframe = useRef<HTMLIFrameElement>(null);

  const [searchParams] = useSearchParams();

  const { clientUrl, documentId, kind, ...params } =
    Object.fromEntries(searchParams);

  const previewUrl =
    `${clientUrl}/api/preview?` + new URLSearchParams(params).toString();

  const {
    devices,

    defaultDevice,

    handleDeviceChange,

    isMobileApp,
  } = useDeviceSelector();

  const [selectedDevice, setSelectedDevice] = useState(defaultDevice);

  useEffect(() => {
    const handleMessage = (message: MessageEvent) => {
      if (message.data.type === "strapiUpdate") {
        iframe.current?.contentWindow?.postMessage(
          message.data,

          clientUrl,
        );
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, [clientUrl]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      gap={4}
      padding={4}
      style={{ width: "100%" }}
    >
      {/* selector de dispositivos */}

      <select
        value={selectedDevice.id}
        onChange={(e) =>
          handleDeviceChange(
            e.target.value,

            setSelectedDevice,
          )
        }
        style={{
          padding: "8px 12px",

          borderRadius: "6px",

          border: "1px solid #dcdcdc",

          fontSize: "14px",
        }}
      >
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>

      {/* fondo visual */}

      <Box
        style={{
          padding: "40px",

          width: "100%",

          minHeight: "100vh",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          background: "linear-gradient(120deg,#f1f2f6,#e6e9ef)",
        }}
      >
        {isMobileApp ? (
          <Box>Mobile preview not available</Box>
        ) : (
          <Box
            tag="iframe"
            src={previewUrl}
            width={selectedDevice.width}
            height={selectedDevice.height}
            ref={iframe}
            style={{
              border: "10px solid #111",

              borderRadius: "24px",

              background: "#fff",

              boxShadow: "0 25px 60px rgba(0,0,0,0.35)",

              transition: "all .25s ease",
            }}
          />
        )}
      </Box>
    </Flex>
  );
};

export default PreviewProxy;
