import { fileRegister } from "../../../../api/fileApi";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise(async (resolve, reject) => {
          try {
            const formData = new FormData();
            formData.append("file", file);

            // fileRegister 호출 → 서버 업로드
            const res = await fileRegister(formData, "notice");

            // 서버에서 반환한 URL 사용
            resolve({
              default: `http://localhost:8080${res.fileData[0].imageUrl}`,
            });
          } catch (err) {
            reject(err);
          }
        })
    );
  }

  abort() {
    // 업로드 취소 시 처리 가능
  }
}

// CKEditor에 UploadAdapter 등록
export function MyCustomUploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
