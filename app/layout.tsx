import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for loading effect
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" 
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" 
    integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" 
    crossOrigin="anonymous" 
    referrerPolicy="no-referrer" />

      </head>
      <body>
        <main>
            {children}
          
        </main>
      </body>
    </html>
  );
}
