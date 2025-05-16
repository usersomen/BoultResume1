let pdfjsWorker: any = null;

export async function getWorker() {
  const version = '2.16.105';
  const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
  return workerSrc;
} 