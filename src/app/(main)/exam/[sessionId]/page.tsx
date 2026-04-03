export default function ExamSessionPage({
  params,
}: {
  params: { sessionId: string };
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold">Session d&apos;examen</h1>
      <p className="mt-2 text-foreground/70">Session : {params.sessionId}</p>
    </main>
  );
}
