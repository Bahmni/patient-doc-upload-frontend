import axios from "axios";
export async function saveFile(file, patientUuid, encounterTypeName, fileName) {
  const bahmniBaseUrl = "/openmrs";
  const format = file.type.split("/")[1];
  let fileType = "";

  if (format.match(/^(jpg|jpeg|png)$/i)) {
    fileType = "image";
  } else if (format.match(/^pdf$/i)) {
    fileType = "pdf";
  } else {
    alert(
      "Unsupported file type. Please select a valid file type (pdf, jpg, jpeg, png)."
    );
    throw new Error("Unsupported file type");
  }

  const url = `${bahmniBaseUrl}/ws/rest/v1/bahmnicore/visitDocument/uploadDocument`;

  try {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const base64File = reader.result.split(",")[1];

        try {
          const response = await axios.post(
            url,
            {
              content: base64File,
              format,
              patientUuid,
              encounterTypeName,
              fileType,
              fileName: fileName.split(".")[0],
            },
            {
              withCredentials: true,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data && response.data.url) {
            resolve(response.data.url);
          } else {
            console.error(
              "Error uploading document: URL not found in response"
            );
            reject(
              new Error("Error uploading document: URL not found in response")
            );
          }
        } catch (error) {
          console.error("Error uploading document:", error);
          reject(error);
        }
      };
    });
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}
