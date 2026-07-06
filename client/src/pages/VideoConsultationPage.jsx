import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PhoneOff, HeartPulse } from "lucide-react";
import VideoCallFrame from "../components/video/VideoCallFrame.jsx";
import { generateRoomName, buildJitsiUrl } from "../utils/videoCall.js";

const VideoConsultationPage = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const roomUrl = useMemo(
    () => buildJitsiUrl(generateRoomName(appointmentId)),
    [appointmentId],
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-black">
      <div className="flex items-center justify-between px-5 py-3 bg-[#0b1220] text-white flex-shrink-0">
        <div className="flex items-center gap-2 font-bold">
          <HeartPulse className="text-primary-400" size={20} /> VitalSync Video
          Consultation
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PhoneOff size={16} /> End Call
        </button>
      </div>
      <div className="flex-1">
        <VideoCallFrame
          roomUrl={roomUrl}
          title="VitalSync Video Consultation"
        />
      </div>
    </div>
  );
};

export default VideoConsultationPage;
