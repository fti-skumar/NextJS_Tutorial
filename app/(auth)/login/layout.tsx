export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-[#f6f4f7]"
    >
      {children}
    </div>
  );
}