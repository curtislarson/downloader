const url = Deno.env.get("DOWNLOAD_URL");
if (url === undefined) {
  console.error("DOWNLOAD_URL is not provided");
  Deno.exit();
}

async function download(downloadUrl: string) {
  const file = Deno.makeTempFileSync();
  const denoFile = Deno.openSync(file, { write: true, create: true });

  const stream = await fetch(downloadUrl).then((r) => r.body!);

  await stream.pipeTo(denoFile.writable);

  denoFile.close();
}

download(url).catch(console.error);
