import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ImageList, ImageListItem } from '@mui/material';

interface Photo {
  id: string;
  url: string;
  title?: string;
}

// Dummy Google Drive fetch function
async function fetchDrivePhotos(): Promise<Photo[]> {
  // Normally you would use OAuth + Drive API to list files in a folder
  // Here we return dummy picsum images for now
  return Array.from({ length: 31 }).map((_, i) => ({
    id: `photo-${i}`,
    url: `https://picsum.photos/seed/${i}/1200/800`,
    title: `Photo ${i + 1}`,
  }));
}

export default function GalleryComponent() {
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const photosPerPage = 9;

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState(0);

  React.useEffect(() => {
    async function loadPhotos() {
      const data = await fetchDrivePhotos();
      setPhotos(data);
    }
    loadPhotos();
  }, []);

  const totalPages = Math.ceil(photos.length / photosPerPage);
  const paginatedPhotos = photos.slice(
    (currentPage - 1) * photosPerPage,
    currentPage * photosPerPage
  );

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const nextPhoto = () => setModalIndex((prev) => (prev + 1) % photos.length);
  const prevPhoto = () =>
    setModalIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        px: 2,
        backgroundColor: 'transparent',
      }}
    >
      <Stack
        spacing={4}
        sx={{
          width: '100%',
          maxWidth: 1080,
          backgroundColor: '#f1d3ad',
          borderRadius: 2,
          p: 3,
        }}
      >
        {/* Title */}
        <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'black' }}>
          <Typography
            fontFamily="Futura"
            variant="h4"
            component="h1"
            sx={{ color: 'white', textAlign: 'left' }}
          >
            Photo Gallery
          </Typography>
        </Box>

        {/* Photo Grid */}
        <Box
          sx={{
            backgroundColor: 'black',
            borderRadius: 2,
            minHeight: 600,
            p: 2,
          }}
        >
          <ImageList sx={{ width: '100%', height: '100%' }} gap={15} cols={3}>
            {paginatedPhotos.map((item: Photo, idx) => (
              <ImageListItem
                key={item.id}
                onClick={() =>
                  openModal((currentPage - 1) * photosPerPage + idx)
                }
                sx={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  },
                }}
              >
                <img
                  srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title || ''}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ee8220',
                color: '#fff',
                '&:hover': { backgroundColor: '#d66f1a' },
              }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </Button>
            <Typography
              sx={{ display: 'flex', alignItems: 'center', px: 1, color: 'black' }}
            >
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ee8220',
                color: '#fff',
                '&:hover': { backgroundColor: '#d66f1a' },
              }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </Box>
        )}

        {/* Modal */}
        <Dialog
          open={modalOpen}
          onClose={closeModal}
          maxWidth="xl"
          PaperProps={{
            sx: {
              width: '80vw',
              height: '80vh',
              maxWidth: 'none',
              maxHeight: 'none',
              backgroundColor: 'black',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <DialogContent
            sx={{
              position: 'relative',
              p: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <IconButton
              onClick={prevPhoto}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                zIndex: 2,
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={photos[modalIndex]?.url}
                alt={photos[modalIndex]?.title}
                style={{
                  maxWidth: '95%',
                  maxHeight: '95%',
                  objectFit: 'contain',
                  borderRadius: 8,
                }}
              />
            </Box>

            <IconButton
              onClick={nextPhoto}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                zIndex: 2,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </DialogContent>
        </Dialog>
      </Stack>
    </Box>
  );
}
