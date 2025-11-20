import React from "react";
import { Box, Stack, Typography, Card, CardMedia, Button } from "@mui/material";

interface BlogPost {
  title: string;
  date: string;
  snippet: string;
  image?: string;
  link?: string;
}

const sampleBlogs: BlogPost[] = [
  {
    title: "Spring Tour Announcement",
    date: "March 10, 2025",
    snippet:
      "The Pack Strings are hitting the road this spring! Check out our upcoming tour dates across Montana and neighboring states. Expect lively performances and some new arrangements of your favorite tunes!",
    image: "/images/blogs/spring-tour.jpg",
    link: "#",
  },
  {
    title: "Behind the Scenes: Recording Session",
    date: "February 18, 2025",
    snippet:
      "Go behind the scenes with The Pack Strings as we lay down tracks for our latest single. From creative jams to late-night harmonies, see how the magic happens in the studio.",
    image: "/images/blogs/recording.jpg",
    link: "#",
  },
  {
    title: "5 Favorite Covers We Love to Play",
    date: "January 30, 2025",
    snippet:
      "Ever wonder what songs The Pack Strings can't resist covering? From folk classics to rock anthems, we break down five covers that always get the crowd moving.",
    image: "/images/blogs/covers.jpg",
    link: "#",
  },
];

export default function BlogComponent() {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        px: 2,
        backgroundColor: "transparent",
      }}
    >
      <Stack
        spacing={4}
        sx={{
          width: "100%",
          maxWidth: 1080,
          backgroundColor: "#f1d3ad",
          borderRadius: 2,
          p: 3,
        }}
      >
        {/* Section title */}
        <Box sx={{ p: 2, borderRadius: 2, backgroundColor: "black" }}>
          <Typography fontFamily="Futura" variant="h4" sx={{ color: "white", textAlign: "left" }}>
            Band Blog
          </Typography>
        </Box>

        {/* Blog list */}
        <Stack spacing={3}>
          {sampleBlogs.map((blog) => (
            <Card
              key={blog.title}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {blog.image && (
                <CardMedia
                  component="img"
                  image={blog.image}
                  alt={blog.title}
                  sx={{ width: { xs: "100%", md: 250 }, height: 150, objectFit: "cover" }}
                />
              )}
              <Box
                sx={{
                  p: 2,
                  flex: 1,
                  backgroundColor: "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography fontFamily="Futura" fontSize={18} sx={{ color: "white", fontWeight: 600 }}>
                    {blog.title}
                  </Typography>
                  <Typography fontFamily="Futura" fontSize={12} sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}>
                    {blog.date}
                  </Typography>
                  <Typography fontFamily="Futura" fontSize={14} sx={{ color: "white" }}>
                    {blog.snippet}
                  </Typography>
                </Box>
                {blog.link && (
                  <Button
                    href={blog.link}
                    sx={{
                      mt: 1,
                      alignSelf: "flex-start",
                      backgroundColor: "#ee8220",
                      color: "white",
                      "&:hover": { backgroundColor: "#d46f18" },
                    }}
                  >
                    Read More
                  </Button>
                )}
              </Box>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
