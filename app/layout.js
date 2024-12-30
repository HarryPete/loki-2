import { Poppins } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrappper";
import { Toaster } from "sonner";


export const metadata = 
{
  title: "FINTS AML",
  description: "FINTS AML",
};

const poppins = Poppins({
  subsets: ['latin'], // Add subsets as per your need
  weight: ['400', '600', '700'], // Specify font weights
  variable: '--font-poppins', // Optional: Define a CSS variable
});


export default async function RootLayout({ children }) 
{

  return (
    <html lang="en">
      <meta name="keywords" content="CAMS, CGSS, AML, Compliance"/>
      <meta property="og:title" content="FINTS AML - FinCrime Trusted Source AML"/>  
      <meta property="og:description" content="FINTS AML offers  high-quality materials, live interactive classes and practice sessions, all crafted by industry expert to clear CAMS & CGSS. Explore our resources and insights to combat financial crime effectively."/>
      <meta property="og:image" content="fintsAML"/>
      {/* <meta property="og:url" content="https://www.fintsacademy.com"/> */}
      <SessionWrapper>
          <body className={poppins.className}>
            {children}
            <Toaster toastOptions={{ style:{backgroundColor : 'white', color: 'var(--primary-color)', boxShadow:'var(--box-shadow)', padding: '20px ', fontSize: '15px', border:'0'}}}/> 
          </body>
      </SessionWrapper>
    </html>
  );
}

