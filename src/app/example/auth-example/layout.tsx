export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <h1>ExamLayout</h1>
      {children}
    </>
  )
}
