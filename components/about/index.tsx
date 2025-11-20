import React, { useState } from "react";
import { Box, Stack, Typography, Card, CardMedia, Divider } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import KeyboardIcon from "@mui/icons-material/Keyboard";


interface BandMember {
  name: string;
  image: string;
  bio: string;
  instruments: string
}

const bandMembers: BandMember[] = [
  {
    name: "Connor Adams",
    image: "/bandpage/images/connor.png",
    bio: "Connor Bio.",
    instruments: "Bass, Guitar, Vocals",
  },
  {
    name: "Marit Olson",
    image: "/bandpage/images/marit.png",
    bio: "Marit's fiddle (violin) career is over two decades old. Classically trained, she played with high school and college orchestras (touring internationally), fiddled on rooftops in the musical classic Fiddler on the Roof (twice), learned tunes in Irish pubs, harmonized with seabirds along Scottish and New Zealand coastlines, and played 'Twinkle Twinkle Little Star' duets with a 10 year old in the forests of Thailand.\n\nShe's been playing (off and on) with The Packstrings for 6 years and loves collaboratively creating new music, finding vocal harmonies, and using solos to tug at heartstrings - especially in leaning into the “spooky sensual” voice of her violin. When she’s not fiddling you can find her doing trauma therapy with kids, building community solidarity, gardening, and exploring new crafting mediums on a regular basis.",
        instruments: "Fiddle, Vocals",

  },
  {
    name: "Chad Pickett",
    image: "/bandpage/images/chad.png",
    bio: "Busking for bus fare, jamming in garages and pickin around campfires, Chad developed his musical style from playing with other people and learning to adapt to different styles. In 2021 he was a featured artist for a Montana Area Music Association singer/songwriter showcase at The Roxy Theatre. After exploring musical ventures as a solo artist, various acoustic arrangements and a couple of rock band experiments, he’s found his place in The Pack Strings.\n\nHe thrives on the variety of genres the band explores, taking turns singing lead and back up, passing bass and guitar back and forth with Connor and most recently filling a new role on mandolin. He enjoys looking for ways to musically compliment his band mates and loves feeding off of each others’ style and energy.",
    instruments: "Bass, Guitar, Mandolin, Vocals",

  },
  {
    name: "Silas Smith",
    image: "/bandpage/images/silas.png",
    bio: "Silas was born in Olympia, Washington and currently lives in Bonner, Montana on the property his great-grandparents homesteaded. He graduated from the University of Montana, and when he is not playing music, enjoys hiking, traveling and hanging out with his friends, black lab, and 2 cats. Silas grew up playing the piano, but switched to playing guitar in middle school, and has enjoyed playing live music in bands since high school.\n\nHe is the newest member of The Pack Strings, and has quickly found a home with the band playing guitar, adding his influence to music he has been a fan of for some time. He enjoys the high level of musicianship and comradery in The Pack Strings, and looks forward to expanding his horizons together with the band!",
        instruments: "Guitar",

  },
];

export default function AboutComponent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedMember = bandMembers[selectedIndex];

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", px: 2 }}>
      <Stack spacing={4} sx={{ width: "100%", maxWidth: 1080, p: 3, backgroundColor: "#f1d3ad", borderRadius: 2 }}>
        <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'black' }}>
          <Typography
            fontFamily="Futura"
            variant="h4"
            component="h1"
            sx={{ color: 'white', textAlign: 'left' }}
          >
            Meet the Band
          </Typography>
        </Box>
{/* Banner */}
<Box sx={{ width: "100%", height: 400, borderRadius: 2, overflow: "hidden" }}>
  <img
    src="/bandpage/images/banner.png"
    alt="Band Banner"
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
</Box>

<Box sx={{ p: 3, backgroundColor: "#000", borderRadius: 2 }}>
  <Typography
    fontFamily="Futura"
    fontSize={18}
    sx={{ color: "white", whiteSpace: "pre-line" }}
  >
    {"The Pack Strings are a lively acoustic quartet from Missoula, Montana. Emerging from the dimly lit corners of brew pubs and tap houses where they gained a reputation for their powerful vocals, surprising cover selections and rowdy St. Patrick’s Day performances, The Pack Strings have dug their heels firmly into the Western Montana music scene.\n\nThey keep their audience on their toes with catchy songwriting, a delightful breadth of genre sampling, harmonizing and instrument swapping. They specialize in exploring genres while maintaining a style informed by their Americana roots infused with folk, rock and bluegrass influences. From fast paced high energy boot stompers to floating melodic lines, The Pack Strings always deliver a good time."}
  </Typography>
</Box>


                <Divider sx={{ borderColor: "black" }} />
        


        {/* Member cards */}
        <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
          {bandMembers.map((member, index) => {
            const isActive = index === selectedIndex;
            return (
              <Box key={member.name} sx={{ position: "relative" }}>
                <Card
                  onClick={() => setSelectedIndex(index)}
                  sx={{
                    width: 225,
                    height: 500,
                    cursor: "pointer",
                    border: isActive ? "3px solid #ee8220" : "3px solid transparent",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={member.image}
                    alt={member.name}
                    sx={{ flex: 1, objectFit: "cover" }}
                  />
                  <Box sx={{ p: 1, textAlign: "center", backgroundColor: "#000" }}>
                    <Typography
                      fontFamily="Futura"
                      fontSize={20}
                      sx={{ color: isActive ? "white" : "rgba(255,255,255,0.7)" }}
                    >
                      {member.name}
                    </Typography>
                                        <Typography
                      fontFamily="Futura"
                      fontSize={12}
                      sx={{ color: isActive ? "white" : "rgba(255,255,255,0.7)" }}
                    >
                      {member.instruments}
                    </Typography>
                  </Box>
                </Card>
              </Box>
              
            );
          })}
          
        </Stack>
                {/* Bio text */}
        <Box sx={{ p: 3, backgroundColor: "#000", borderRadius: 2 }}>
<Typography
  fontFamily="Futura"
  fontSize={18}
  sx={{ color: "white", whiteSpace: "pre-line" }}
>
  {selectedMember.bio}
</Typography>
        </Box>

      </Stack>
    </Box>
  );
}
