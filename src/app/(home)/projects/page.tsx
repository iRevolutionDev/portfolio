import {Button, Card, CardActions, CardHeader, Grid, Stack, Typography} from "@mui/material";
import {Repositories} from "@/@types/github-repo";
import Link from "next/link";
import {FaStar} from "react-icons/fa";
import {BiGitRepoForked} from "react-icons/bi";

export default async function Page() {
    const response = await fetch('https://api.github.com/users/irevolutiondev/repos');
    const repos = await response.json() as Repositories;

    return (
        <>
            <Stack direction="column" spacing={2}>
                <Typography variant="h4" fontWeight={700}>Projects 📁</Typography>
                <Grid container>
                    {
                        repos
                            .filter((repo) => !repo.fork)
                            .filter((repo) => !repo.name.startsWith('irevolutiondev'))
                            .sort((a, b) => b.stargazers_count - a.stargazers_count)
                            .map((repo) => (
                                <Grid item key={repo.id} xs={12} md={6} pb={2} pr={{xs: 0, md: 2}}>
                                    <Card className="!mr-4 md:!mr-0 w-full h-full" elevation={0} variant="outlined">
                                        <Stack direction="column" className="h-full" spacing={2}>
                                            <CardHeader title={repo.name}
                                                        subheader={repo.description ?? "No description"}/>
                                            <Grid justifyContent="space-between" direction="row"
                                                  alignItems="flex-end" display="flex" className="h-full"
                                            >
                                                <div
                                                    className="flex flex-col p-4"
                                                >
                                                    <Typography variant="body1" className="opacity-60">
                                                        {repo.language}
                                                    </Typography>
                                                    <Grid container spacing={1} alignItems="center">
                                                        <Grid item>
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <FaStar className="text-yellow-400"/>
                                                                <Typography variant="body1" className="opacity-60">
                                                                    {repo.stargazers_count}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid item>
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <BiGitRepoForked className="text-gray-400"/>
                                                                <Typography variant="body1" className="opacity-60">
                                                                    {repo.forks_count}
                                                                </Typography>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <CardActions>
                                                    <Button component={Link} href={repo.html_url} target="_blank"
                                                            rel="noopener noreferrer">
                                                        View on GitHub
                                                    </Button>
                                                </CardActions>
                                            </Grid>
                                        </Stack>
                                    </Card>
                                </Grid>
                            ))
                    }
                </Grid>
            </Stack>
        </>
    )
}