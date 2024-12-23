import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, Avatar, Link } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Carousel from 'react-material-ui-carousel';

export default function Reviews() {
        // Function to chunk the testimonials array into groups of three for the carousel
        const chunkSize = window.innerWidth > 960 ? 3 : 1;;
        const chunks = [];
        for (let i = 0; i < testimonials.length; i += chunkSize) {
            chunks.push(testimonials.slice(i, i + chunkSize));
        }
    
    return (
        <Box sx={{ py: { xs: 4, sm: 8, lg: 10, width: "100%" }, backgroundColor: '#f7f7f7', position: 'relative', overflow: 'hidden' }}>
            <Container maxWidth="xl">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                        2,157 people have said how good Rareblocks
                    </Typography>
                    <Typography variant="h2" sx={{ mt: 2, fontWeight: 'bold' }}>
                        Our happy clients say about us
                    </Typography>
                </Box>

                <Box sx={{ mt: { xs: 4, md: 8 }, textAlign: 'center' }}>
                    <Link href="#" underline="none" color="text.primary" sx={{
                        fontWeight: 'bold',
                        borderBottom: 2,
                        borderColor: 'text.primary',
                        '&:hover': {
                            borderColor: 'text.secondary',
                            color: 'text.secondary',
                        }
                    }}>
                        Check all 2,157 reviews
                    </Link>
                </Box>

                {/* Adjusted Gradient Background */}
                <Box sx={{
                    position: 'absolute',
                    top: '60%', // Center vertically
                    left: '50%', // Center horizontally
                    transform: 'translate(-50%, -50%)', // Ensure it centers exactly
                    width: '80%', // Take the full container width
                    height: '40%', // Limit height to 80% of its container
                    background: 'linear-gradient(90deg, #44ff9a -0.40%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                    borderRadius: '20px',
                    opacity: 0.3,
                    filter: 'blur(20px)',
                    zIndex: 0
                }} />

                <Carousel indicators animation="slide" swipe autoPlay duration={400} indicatorIconButtonProps={{ style: { marginTop: '60px', marginBottom: '60px'} }}>
                     {chunks.map((chunk, index) => (
                        <Grid container spacing={2} key={index} justifyContent="center" sx={{ mt: { xs: 5, md: 6 }, position: 'relative', zIndex: 1, padding: "20px" }}>

                             {chunk.map((testimonial, idx) => (
                                 <Grid item xs={12} md={4} key={idx}>
                                     <Card raised>
                                         <CardContent>
                                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} sx={{ color: '#FDB241' }} />
                                        ))}
                                        </Box>
                                        <Typography variant="body1" color="text.primary" paragraph>
                                        {testimonial.quote}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                            <Avatar src={testimonial.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {testimonial.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {testimonial.title}
                                            </Typography>
                                        </Box>
                                        </Box>
                                         </CardContent>
                                     </Card>
                                 </Grid>
                             ))}
                         </Grid>
                     ))}
                 </Carousel>
            </Container>
        </Box>
    );
}

const testimonials = [
    {
        name: "Leslie Alexander",
        title: "Freelance React Developer",
        avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png",
        quote: "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change."
    },
    {
        name: "Jacob Jones",
        title: "Digital Marketer",
        avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png",
        quote: "Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users."
    },
    {
        name: "Jenny Wilson",
        title: "Graphic Designer",
        avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png",
        quote: "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish."
    },
    {
        name: "Jenny Wilson",
        title: "Graphic Designer",
        avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png",
        quote: "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish."
    },
    {
        name: "Jenny Wilson",
        title: "Graphic Designer",
        avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png",
        quote: "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish."
    },
    {
        name: "Jenny Wilson",
        title: "Graphic Designer",
        avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png",
        quote: "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish."
    }

];
