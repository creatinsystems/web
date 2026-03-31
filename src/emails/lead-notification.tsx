import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Preview,
  Heading,
  Row,
  Column,
} from "@react-email/components";

interface LeadNotificationProps {
  name: string;
  email: string;
  company: string;
  headache: string;
  submittedAt: string;
}

export function LeadNotification({
  name,
  email,
  company,
  headache,
  submittedAt,
}: LeadNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        New lead from {name} — {email}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading as="h1" style={headerTitle}>
              Creatin Systems
            </Heading>
            <Text style={headerSubtitle}>New Lead Notification</Text>
          </Section>

          <Section style={content}>
            <Heading as="h2" style={sectionTitle}>
              Contact Details
            </Heading>

            <Row style={fieldRow}>
              <Column style={fieldLabel}>Name</Column>
              <Column style={fieldValue}>{name}</Column>
            </Row>

            <Row style={fieldRow}>
              <Column style={fieldLabel}>Email</Column>
              <Column style={fieldValue}>{email}</Column>
            </Row>

            {company && (
              <Row style={fieldRow}>
                <Column style={fieldLabel}>Company / URL</Column>
                <Column style={fieldValue}>{company}</Column>
              </Row>
            )}

            <Hr style={divider} />

            <Heading as="h2" style={sectionTitle}>
              Tech Headache
            </Heading>
            <Text style={headacheText}>{headache}</Text>

            <Hr style={divider} />

            <Text style={timestamp}>Submitted: {submittedAt}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This is an automated notification from the Creatin Systems website contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ── Styles ────────────────────────────────────────────────── */

const body: React.CSSProperties = {
  backgroundColor: "#f0f3ff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "20px 0",
};

const header: React.CSSProperties = {
  backgroundColor: "#0e1240",
  borderRadius: "12px 12px 0 0",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const headerTitle: React.CSSProperties = {
  color: "#818cf8",
  fontSize: "24px",
  fontWeight: 700,
  margin: "0 0 4px",
  letterSpacing: "-0.02em",
};

const headerSubtitle: React.CSSProperties = {
  color: "#9aaeff",
  fontSize: "14px",
  margin: 0,
};

const content: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "32px 40px",
};

const sectionTitle: React.CSSProperties = {
  color: "#0e1240",
  fontSize: "16px",
  fontWeight: 600,
  margin: "0 0 16px",
};

const fieldRow: React.CSSProperties = {
  marginBottom: "12px",
};

const fieldLabel: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "13px",
  fontWeight: 500,
  width: "120px",
  verticalAlign: "top",
  paddingRight: "12px",
};

const fieldValue: React.CSSProperties = {
  color: "#111827",
  fontSize: "14px",
};

const divider: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const headacheText: React.CSSProperties = {
  color: "#111827",
  fontSize: "14px",
  lineHeight: "1.6",
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "8px",
  margin: 0,
  whiteSpace: "pre-wrap",
};

const timestamp: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  margin: 0,
};

const footer: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  borderRadius: "0 0 12px 12px",
  padding: "20px 40px",
  textAlign: "center" as const,
};

const footerText: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  margin: 0,
};

export default LeadNotification;
