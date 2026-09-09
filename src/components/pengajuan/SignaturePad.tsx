"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { RotateCcw, Trash2, Check, PenTool } from "lucide-react";

interface SignaturePadProps {
  onSignatureChange: (dataUrl: string | null) => void;
  height?: number;
  strokeColor?: string;
}

export default function SignaturePad({
  onSignatureChange,
  height = 190,
  strokeColor = "#be123c", // Deep romantic rose
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Initialize canvas with proper scale for high-DPI screens
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;

    // Save initial blank state
    setHistory([]);
    setHasDrawn(false);
    onSignatureChange(null);
  }, [onSignatureChange, strokeColor]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      initCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), imgData]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    saveState();
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSignatureChange(dataUrl);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setHasDrawn(false);
    onSignatureChange(null);
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || history.length === 0) return;

    const prevHistory = [...history];
    const previousState = prevHistory.pop();
    setHistory(prevHistory);

    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      onSignatureChange(dataUrl);
    } else {
      clearCanvas();
    }
  };

  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span className="flex items-center gap-1.5 font-medium text-rose-700">
          <PenTool className="w-3.5 h-3.5 text-rose-500" />
          Area Tanda Tangan Layar Sentuh / Mouse
        </span>
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              type="button"
              onClick={undo}
              className="px-3 py-1 text-xs rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3 h-3" />
              Undo
            </button>
          )}
          <button
            type="button"
            onClick={clearCanvas}
            className="px-3 py-1 text-xs rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
          >
            <Trash2 className="w-3 h-3" />
            Hapus / Ulang
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl border-2 border-dashed border-rose-300 bg-[#fffafb] hover:border-rose-400 transition-colors overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          style={{ height: `${height}px`, touchAction: "none" }}
          className="w-full block cursor-crosshair bg-transparent"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {!hasDrawn && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-4 text-rose-400/70">
            <span className="text-2xl mb-1">✍️</span>
            <p className="text-sm font-semibold text-rose-600 tracking-wide">
              Bubuhkan tanda tangan cinta di sini yaa
            </p>
            <p className="text-xs text-rose-400 mt-0.5">
              Gunakan jari Anda di layar HP / mouse komputer
            </p>
          </div>
        )}

        {hasDrawn && (
          <div className="absolute bottom-3 right-3 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-rose-100 text-rose-700 border border-rose-300 shadow-sm">
              <Check className="w-3 h-3" /> Tanda Tangan Siap
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
