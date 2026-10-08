const DATABASE_NAME = 'edumate-class-media';
const STORE_NAME = 'recordings';
const DATABASE_VERSION = 1;

function openRecordingDatabase() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('This browser does not support local recording storage.'));
      return;
    }

    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open local recording storage.'));
  });
}

export async function saveClassRecording(blob) {
  const database = await openRecordingDatabase();
  const id = `recording-${Date.now()}`;

  await new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).put(blob, id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error('Could not save the class recording.'));
    transaction.onabort = () => reject(transaction.error || new Error('Saving the class recording was cancelled.'));
  });

  database.close();
  return id;
}

export async function loadClassRecording(id) {
  const database = await openRecordingDatabase();
  const blob = await new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly');
    const request = transaction.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not load the class recording.'));
  });
  database.close();

  if (!(blob instanceof Blob)) throw new Error('This recording is no longer available in this browser.');
  return blob;
}

export async function deleteClassRecording(id) {
  const database = await openRecordingDatabase();
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite');
    transaction.objectStore(STORE_NAME).delete(id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error('Could not remove the class recording.'));
    transaction.onabort = () => reject(transaction.error || new Error('Removing the class recording was cancelled.'));
  });
  database.close();
}
