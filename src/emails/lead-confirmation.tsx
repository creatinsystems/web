import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Link,
  Preview,
  Heading,
} from "@react-email/components";

interface LeadConfirmationProps {
  name: string;
}

export function LeadConfirmation({ name }: LeadConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>We received your audit request — Creatin Systems</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={topAccent} />

          <Section style={header}>
            <Heading as="h1" style={headerTitle}>
              Creatin Systems
            </Heading>
          </Section>

          <Section style={content}>
            <Heading as="h2" style={greeting}>
              Hi {name},
            </Heading>

            <Text style={paragraph}>
              Thanks for reaching out! We&apos;ve received your request for a free infrastructure
              audit.
            </Text>

            <Text style={paragraph}>
              One of our engineers will review your submission and get back to you within 1–2
              business days with actionable insights about your system&apos;s speed, security, and
              UX bottlenecks.
            </Text>

            <Text style={paragraph}>No sales pressure — just honest engineering advice.</Text>

            <Hr style={divider} />

            <Text style={signoff}>
              — The Creatin Systems Team
              <br />
              High-Velocity Cloud Engineering
            </Text>

            <Section style={ctaSection}>
              <Link href="https://creatinsystems.com" style={ctaLink}>
                Visit our site &rarr;
              </Link>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              You received this email because you submitted a form on creatinsystems.com.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ── Styles ────────────────────────────────────────────────── */

const fontFamily =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const body: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  fontFamily,
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "20px 0",
};

const topAccent: React.CSSProperties = {
  height: "2px",
  backgroundColor: "#818cf8",
  borderRadius: "12px 12px 0 0",
  margin: 0,
  padding: 0,
};

const header: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const headerTitle: React.CSSProperties = {
  color: "#18181b",
  fontSize: "24px",
  fontWeight: 600,
  margin: 0,
  letterSpacing: "-0.02em",
};

const content: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "0 40px 32px",
};

const greeting: React.CSSProperties = {
  color: "#18181b",
  fontSize: "20px",
  fontWeight: 600,
  margin: "0 0 14px",
  letterSpacing: "-0.01em",
};

const paragraph: React.CSSProperties = {
  color: "#3f3f46",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 14px",
  letterSpacing: "-0.01em",
};

const divider: React.CSSProperties = {
  borderColor: "#e4e4e7",
  margin: "24px 0",
};

const signoff: React.CSSProperties = {
  color: "#18181b",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 20px",
  letterSpacing: "-0.01em",
};

const ctaSection: React.CSSProperties = {
  textAlign: "center" as const,
};

const ctaLink: React.CSSProperties = {
  color: "#818cf8",
  fontSize: "14px",
  fontWeight: 500,
  textDecoration: "none",
  letterSpacing: "-0.01em",
};

const footer: React.CSSProperties = {
  backgroundColor: "#fafafa",
  borderRadius: "0 0 12px 12px",
  padding: "20px 40px",
  textAlign: "center" as const,
};

const footerText: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: "12px",
  margin: 0,
};

export default LeadConfirmation;
