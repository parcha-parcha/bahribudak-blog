import Link from "next/link";
import styles from "./DownloadCard.module.css";

export type DownloadFileType =
  | "PDF"
  | "DOCX"
  | "PPTX"
  | "XLSX"
  | "ZIP"
  | "OTHER";

type DownloadCardProps = {
  title: string;
  description?: string;
  fileType: DownloadFileType;
  fileSize?: string;
  downloadUrl?: string;
  isLocked?: boolean;
  loginUrl?: string;
  membershipLabel?: string;
  downloadLabel?: string;
  className?: string;
};

const fileTypeLabels: Record<DownloadFileType, string> = {
  PDF: "PDF",
  DOCX: "DOCX",
  PPTX: "PPTX",
  XLSX: "XLSX",
  ZIP: "ZIP",
  OTHER: "DOSYA",
};

export default function DownloadCard({
  title,
  description,
  fileType,
  fileSize,
  downloadUrl,
  isLocked = false,
  loginUrl = "/tr/login",
  membershipLabel = "Üyelikle indir",
  downloadLabel = "Dosyayı indir",
  className = "",
}: DownloadCardProps) {
  const cardClassName = [styles.card, className].filter(Boolean).join(" ");

  return (
    <section className={cardClassName}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>
          {isLocked ? "ÜYELİKLİ DOSYA" : "İNDİRİLEBİLİR DOSYA"}
        </span>

        <h3 className={styles.title}>{title}</h3>

        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}

        <div className={styles.meta}>
          <span className={styles.fileType}>
            {fileTypeLabels[fileType]}
          </span>

          {fileSize ? (
            <>
              <span className={styles.separator} aria-hidden="true">
                •
              </span>
              <span>{fileSize}</span>
            </>
          ) : null}
        </div>
      </div>

      <div className={styles.action}>
        {isLocked ? (
          <Link href={loginUrl} className={styles.button}>
            {membershipLabel}
          </Link>
        ) : downloadUrl ? (
          <a
            href={downloadUrl}
            className={styles.button}
            download
          >
            {downloadLabel}
          </a>
        ) : (
          <span className={styles.unavailable}>
            Dosya bağlantısı hazırlanıyor
          </span>
        )}
      </div>
    </section>
  );
}