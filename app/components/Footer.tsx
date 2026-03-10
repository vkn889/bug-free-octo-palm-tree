export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #1a1a1a',
      padding: '32px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#444', letterSpacing: '0.08em' }}>
        Member of <span style={{ color: '#555' }}>FBLA · DECA · TSA</span>
      </div>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#333', letterSpacing: '0.05em' }}>
        © 2025 Viraat Krishna Nellutla · Designed &amp; built by{' '}
        <span style={{ color: '#2D6BFF' }}>VKN</span> · v1.0
      </div>
    </footer>
  );
}
