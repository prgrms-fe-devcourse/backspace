import { useEffect, useId, useState } from "react";

import Button from "@/components/common/Button/Button";
import TextArea from "@/components/common/TextArea/TextArea";

import GalleryUploadFileSelector from "./GalleryUploadFileSelector";

interface GalleryUploadPanelProps {
  onCancel: () => void;
  onUpload?: (file?: File, description?: string) => void;
}

export default function GalleryUploadPanel({ onCancel, onUpload }: GalleryUploadPanelProps) {
  const descriptionId = useId();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl]
  );
  const handleUpload = () => {
    onUpload?.(file, description);
    onCancel();
  };

  return (
    <div className="flex h-full w-full flex-col gap-3">
      {/* 파일 선택 영역 */}
      <span>파일 선택</span>
      <GalleryUploadFileSelector
        fileName={fileName}
        fileSize={fileSize}
        previewUrl={previewUrl}
        onFileChange={(selectedFile) => {
          if (!selectedFile) {
            setFileName(null);
            setFileSize(null);
            setFile(undefined);
            setPreviewUrl(null);
            return;
          }
          setFile(selectedFile);
          setFileName(selectedFile.name);
          const sizeInMb = selectedFile.size / 1024 / 1024;
          setFileSize(
            sizeInMb < 1 ? `${(sizeInMb * 1024).toFixed(0)} KB` : `${sizeInMb.toFixed(1)} MB`
          );
          const objectUrl = URL.createObjectURL(selectedFile);
          setPreviewUrl(objectUrl);
        }}
      />

      {/* 설명 입력 영역 */}
      <section className="space-y-2">
        <span>설명</span>
        <TextArea
          id={descriptionId}
          className="h-20"
          placeholder="사진 설명을 작성해 보세요."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </section>

      {/* 업로드/취소 버튼 영역 */}
      <div className="mt-auto flex justify-end gap-2">
        <Button composition="textOnly" onClick={onCancel}>
          취소
        </Button>
        <Button composition="textOnly" onClick={handleUpload} disabled={!file}>
          업로드
        </Button>
      </div>
    </div>
  );
}
