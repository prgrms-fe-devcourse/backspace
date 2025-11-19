import { useEffect, useId, useState } from "react";

import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";

import GalleryUploadFileSelector from "./GalleryUploadFileSelector";

interface GalleryUploadPanelProps {
  onCancel: () => void;
  onUpload?: (file?: File, description?: string) => Promise<void> | void;
  initialDescription?: string;
  initialPreviewUrl?: string | null;
  submitLabel?: string;
  allowEmptyFile?: boolean;
}

export default function GalleryUploadPanel({
  onCancel,
  onUpload,
  initialDescription,
  initialPreviewUrl,
  submitLabel,
  allowEmptyFile = false,
}: GalleryUploadPanelProps) {
  const descriptionId = useId();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreviewUrl ?? null);
  const [description, setDescription] = useState(initialDescription ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(
    () => () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl]
  );

  useEffect(() => {
    setPreviewUrl(initialPreviewUrl ?? null);
  }, [initialPreviewUrl]);

  useEffect(() => {
    setDescription(initialDescription ?? "");
  }, [initialDescription]);

  const requiresFile = !allowEmptyFile;

  const handleUpload = async () => {
    if (isSubmitting) return;
    if (requiresFile && !file) {
      setSubmitError("파일을 선택해 주세요.");
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await onUpload?.(file, description);
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("업로드에 실패했습니다.");
      }
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-hidden">
      <div className="scrollbar flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col">
          {/* 파일 선택 영역 */}
          <span>파일 선택 </span>

          <GalleryUploadFileSelector
            fileName={fileName}
            fileSize={fileSize}
            previewUrl={previewUrl}
            onFileChange={(selectedFile) => {
              if (!selectedFile) {
                setFileName(null);
                setFileSize(null);
                setFile(undefined);
                setPreviewUrl(initialPreviewUrl ?? null);
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
        </div>
      </div>

      {/* 업로드/취소 버튼 영역 */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-end gap-2">
          <div>{submitError && <p className="text-red-500">{submitError}</p>}</div>

          <Button composition="textOnly" onClick={onCancel} disabled={isSubmitting}>
            취소
          </Button>
          <Button
            composition="textOnly"
            onClick={handleUpload}
            disabled={(requiresFile && !file) || isSubmitting}
          >
            {(() => submitLabel ?? "업로드")()}
          </Button>
        </div>
      </div>
    </div>
  );
}
