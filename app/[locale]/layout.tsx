import i18nConfig from '@/i18nConfig';
import type { Metadata } from 'next';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import './globals.css';
import { dir } from 'i18next';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/provider/theme-provider';
import AppProvider from '@/components/provider/app-provider';
import BaseLayout from '@/components/layout/base-layout';
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/provider/translations-provider';

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Get detail weather anywhere',
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

const i18nNamespaces = ['common'];

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppProvider>
            <TranslationsProvider
              namespaces={i18nNamespaces}
              locale={locale}
              resources={resources}
            >
              <BaseLayout>{children}</BaseLayout>
            </TranslationsProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
