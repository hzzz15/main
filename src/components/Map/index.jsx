import React, { useEffect, useRef, useState } from "react";

const Map = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [polyline, setPolyline] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/address/addresses");
      const data = await response.json();

      console.log("📌 받아온 주소 데이터:", data);

      if (!data || data.length < 2) {
        console.error("🚨 출발지와 목적지를 설정할 데이터가 부족합니다.");
        return;
      }

      const startLocation = data[0];
      const startPosition = new window.Tmapv2.LatLng(startLocation.latitude, startLocation.longitude);

      const endLocation = data[data.length - 1];
      const endPosition = new window.Tmapv2.LatLng(endLocation.latitude, endLocation.longitude);

      const newMap = new window.Tmapv2.Map(mapRef.current, {
        center: startPosition,
        width: "100%",
        height: "100%",
        zoom: 16,
      });

      setMap(newMap);
      console.log("🗺️ 지도 객체 생성 완료:", newMap);

      const startMarker = new window.Tmapv2.Marker({
        position: startPosition,
        map: newMap,
        label: "출발지",
      });

      const endMarker = new window.Tmapv2.Marker({
        position: endPosition,
        map: newMap,
        label: "목적지",
      });

      console.log("📍 출발지 마커 추가 완료:", startMarker);
      console.log("📍 목적지 마커 추가 완료:", endMarker);

      drawPedestrianRoute(startLocation, endLocation, newMap);
    } catch (error) {
      console.error("🚨 주소 데이터를 불러오는데 실패했습니다:", error);
    }
  };

  const drawPedestrianRoute = async (start, end, mapInstance) => {
    // ... (이전 코드와 동일)
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100%", borderRadius: "20px" }} />
    </div>
  );
};

export default Map;