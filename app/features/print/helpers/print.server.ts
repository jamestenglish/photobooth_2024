// @ts-ignore
import ipp from "@sealsystems/ipp";

export default async function print({
  url,
  data,
}: {
  url: string;
  data: Buffer;
}) {
  return new Promise((resolve, reject) => {
    console.log({ url });
    const printer = new ipp.Printer(url);
    const msg = {
      "operation-attributes-tag": {
        "document-format": "image/jpeg",
      },
      data: Buffer.from(data),
    };

    printer.execute(
      "Print-Job",
      msg,
      function (
        err: Error | null,
        res: {
          version: string;
          operation: any;
          statusCode: any;
          id: any;
          data: any;
        } | null,
      ) {
        if (err !== null) {
          console.error(res);
          console.error(err);
          reject(err);
        } else {
          resolve(res);
        }
      },
    );
  });
}

export async function queryPrinter({ url }: { url: string }) {
  const attributeResponse = await new Promise((resolve, reject) => {
    const dataA = ipp.serialize({
      operation: "Get-Printer-Attributes",
      "operation-attributes-tag": {
        "attributes-charset": "utf-8",
        "attributes-natural-language": "en",
        "printer-uri": url,
      },
    });

    ipp.request(url, dataA, function (err: any, res: any) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(JSON.stringify(res, null, 2));
        resolve(res);
      }
    });
  });

  return attributeResponse;
}

export async function getJobs({ url }: { url: string }) {
  const attributeResponse = await new Promise((resolve, reject) => {
    const dataA = ipp.serialize({
      operation: "Get-Jobs",
      "operation-attributes-tag": {
        "attributes-charset": "utf-8",
        "attributes-natural-language": "en",
        "printer-uri": url,
      },
    });

    ipp.request(url, dataA, function (err: any, res: any) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(JSON.stringify(res, null, 2));
        resolve(res);
      }
    });
  });

  return attributeResponse;
}
