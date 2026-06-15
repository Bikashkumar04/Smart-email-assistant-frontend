import { useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  SvgIcon,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import './App.css';

const API_URL =
  import.meta.env.VITE_EMAIL_API_URL ??
  'http://localhost:8080/api/email/generate';

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
];

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5b5bd6',
      dark: '#4747b8',
      light: '#ededff',
    },
    background: {
      default: '#f6f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#17182c',
      secondary: '#686b80',
    },
  },
  typography: {
    fontFamily:
      '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h3: {
      fontWeight: 750,
      letterSpacing: '-0.045em',
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '-0.01em',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 46,
          borderRadius: 11,
          boxShadow: 'none',
        },
        containedPrimary: {
          boxShadow: '0 10px 24px rgba(91, 91, 214, 0.22)',
          '&:hover': {
            boxShadow: '0 12px 28px rgba(91, 91, 214, 0.28)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fbfbfe',
          borderRadius: 12,
          transition: 'background-color 160ms ease, box-shadow 160ms ease',
          '&:hover': {
            backgroundColor: '#ffffff',
          },
          '&.Mui-focused': {
            backgroundColor: '#ffffff',
            boxShadow: '0 0 0 4px rgba(91, 91, 214, 0.08)',
          },
        },
        notchedOutline: {
          borderColor: '#dedfeb',
        },
      },
    },
  },
});

function SparkleIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2.75c.36 4.85 2.4 6.9 7.25 7.25-4.85.36-6.9 2.4-7.25 7.25-.36-4.85-2.4-6.9-7.25-7.25C9.6 9.64 11.64 7.6 12 2.75Zm6.75 13.5c.14 1.86.9 2.61 2.75 2.75-1.86.14-2.61.9-2.75 2.75-.14-1.86-.9-2.61-2.75-2.75 1.86-.14 2.61-.9 2.75-2.75Z" />
    </SvgIcon>
  );
}

function CopyIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M8 7V5.8A2.8 2.8 0 0 1 10.8 3h7.4A2.8 2.8 0 0 1 21 5.8v7.4a2.8 2.8 0 0 1-2.8 2.8H17v1.2a2.8 2.8 0 0 1-2.8 2.8H5.8A2.8 2.8 0 0 1 3 17.2V9.8A2.8 2.8 0 0 1 5.8 7H8Zm2 0h4.2A2.8 2.8 0 0 1 17 9.8V14h1.2a.8.8 0 0 0 .8-.8V5.8a.8.8 0 0 0-.8-.8h-7.4a.8.8 0 0 0-.8.8V7Zm-4.2 2a.8.8 0 0 0-.8.8v7.4a.8.8 0 0 0 .8.8h8.4a.8.8 0 0 0 .8-.8V9.8a.8.8 0 0 0-.8-.8H5.8Z" />
    </SvgIcon>
  );
}

function ResetIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 4a8 8 0 1 1-7.45 10.93l1.86-.73A6 6 0 1 0 7.1 8.65L10 11.54H3V4.53l2.68 2.68A7.98 7.98 0 0 1 12 4Z" />
    </SvgIcon>
  );
}

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('professional');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const canGenerate = emailContent.trim().length > 0 && !loading;

  const handleSubmit = async () => {
    if (!canGenerate) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(API_URL, {
        email: emailContent.trim(),
        tone,
      });
      setReply(
        typeof response.data === 'string'
          ? response.data
          : response.data?.reply ?? '',
      );
    } catch (requestError) {
      console.error('Unable to generate reply:', requestError);
      setError(
        requestError.response?.data?.message ??
          'We could not generate a reply. Check that the email service is running and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!reply) return;

    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
    } catch {
      setError('Clipboard access was unavailable. Please copy the reply manually.');
    }
  };

  const handleReset = () => {
    setEmailContent('');
    setTone('professional');
    setReply('');
    setError('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-shell">
        <Container maxWidth="md" className="app-container">
          <Box component="header" className="hero">
            <Box className="brand-mark" aria-hidden="true">
              <SparkleIcon />
            </Box>
            <Chip
              label="AI writing assistant"
              size="small"
              className="eyebrow-chip"
            />
            <Typography variant="h3" component="h1">
              Write thoughtful replies
              <Box component="span" className="accent-text">
                {' '}
                in seconds.
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Paste an email, choose the right tone, and get a polished response
              ready to send.
            </Typography>
          </Box>

          <Card className="composer-card" elevation={0}>
            <Box className="card-heading">
              <Box>
                <Typography variant="h6">Create your reply</Typography>
                <Typography variant="body2" color="text.secondary">
                  Add the message you received and we will help with the rest.
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {emailContent.length.toLocaleString()} characters
              </Typography>
            </Box>

            <Stack spacing={2.25}>
              <TextField
                fullWidth
                multiline
                minRows={7}
                maxRows={12}
                label="Email content"
                placeholder="Paste the email you would like to reply to..."
                value={emailContent}
                onChange={(event) => setEmailContent(event.target.value)}
                disabled={loading}
                inputProps={{ maxLength: 10000 }}
              />

              <Box className="controls-row">
                <FormControl className="tone-select">
                  <InputLabel id="tone-label">Reply tone</InputLabel>
                  <Select
                    labelId="tone-label"
                    value={tone}
                    label="Reply tone"
                    onChange={(event) => setTone(event.target.value)}
                    disabled={loading}
                  >
                    {tones.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={!canGenerate}
                  startIcon={
                    loading ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <SparkleIcon />
                    )
                  }
                >
                  {loading ? 'Writing your reply...' : 'Generate reply'}
                </Button>
              </Box>
            </Stack>

            {error && (
              <Alert severity="error" className="status-alert">
                {error}
              </Alert>
            )}
          </Card>

          {reply && (
            <Card className="reply-card" elevation={0}>
              <Box className="reply-header">
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h6">Your reply is ready</Typography>
                    <Chip label={tones.find((item) => item.value === tone)?.label} size="small" />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Review and personalize it before sending.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<ResetIcon />}
                    onClick={handleReset}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<CopyIcon />}
                    onClick={handleCopy}
                  >
                    Copy reply
                  </Button>
                </Stack>
              </Box>

              <Box className="reply-content">
                <Typography component="div">{reply}</Typography>
              </Box>
            </Card>
          )}

          <Typography component="footer" variant="caption" color="text.secondary">
            Your email content is used only to generate the reply.
          </Typography>
        </Container>

        <Snackbar
          open={copied}
          autoHideDuration={2500}
          onClose={() => setCopied(false)}
          message="Reply copied to clipboard"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
