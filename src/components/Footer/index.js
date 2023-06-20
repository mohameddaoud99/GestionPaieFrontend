import { Box, Container, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(12)};
`
);

function Footer() {
  return (
    <FooterWrapper className="footer-bottom">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
        position= "fixed"
        
      >
       
          <Typography variant="subtitle1"  style={{ color:'transparent' }}>
            &copy; 2023 - @Copyright Entreprise Logicom
          </Typography>
       
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
