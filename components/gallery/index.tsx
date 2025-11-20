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

interface Photo {
  id: string;
  url: string;
  title?: string;
}

const dummyPhotos: Photo[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `photo-${i}`,
  url: `https://picsum.photos/seed/${i}/600/400`,
  title: `Photo ${i + 1}`,
}));

export default function GalleryComponent() {
  const [photos] = React.useState<Photo[]>(dummyPhotos);
  const [currentPage, setCurrentPage] = React.useState(1);
  const photosPerPage = 9;

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState(0);

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
          maxWidth: 900,
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
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            p: 2,
            backgroundColor: "black",
            borderRadius: 2,
          }}
        >
          {paginatedPhotos.map((photo, idx) => (
            <Box
              key={photo.id}
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '75%', // 4:3 aspect ratio
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: 2,
                '&:hover img': { transform: 'scale(1.05)' },
              }}
              onClick={() => openModal((currentPage - 1) * photosPerPage + idx)}
            >
              <img
                src={photo.url}
                alt={photo.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  transition: 'transform 0.3s',
                }}
              />
            </Box>
          ))}
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
        <Dialog open={modalOpen} onClose={closeModal} maxWidth="md">
          <DialogContent
            sx={{
              position: 'relative',
              backgroundColor: 'black',
              p: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
            <img
              src={photos[modalIndex].url}
              alt={photos[modalIndex].title}
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 8 }}
            />
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
