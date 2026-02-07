import "./globals.css";


export const metadata = {
  title: "Nurse Agency",
  description: "Agency managing nurses for hospitals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        {children}
      </body>
    </html>
  );
}
