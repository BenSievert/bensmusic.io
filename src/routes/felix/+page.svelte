<script lang="ts">
  import SitePage from '../../components/SitePage.svelte';
  import Section from '../../components/Section.svelte';
  import Youtube from 'svelte-youtube-embed';


  const guitarists = [
    {id: `FtK63l541mw`, description: `Ritchie Blackmore was the guitar player for Deep Purple. He was one of the first rock guitarists to blend in Classical influences. Here is Deep Purple's song Lazy which is one of my favorites.`, name: `Ritchie Blackmore` },
    {id: `4FLjT5V5Hog`, description: `David Gilmour is Pink Floyd's guitarist though he was not a founding member. I feel that Comfortably Numb is rightly regarded as one of the best guitar solos of all time.`},
    {id: `35luFxHO5E0`, description: `You can't talk about Classic Rock guitar players without talking about Jimi. Little Wing is one of my favorite songs of all time.`, name: `Jimi Hendrix`},
    {id: `a9h2H5Sgzfw`, description: `Alex Lifeson was Rush's guitarist and made a lot of interesting music with the band though he's sometimes underrecognized compared to his bandmates.`, name: `Alex Lifeson`},
    {id: `5aWd88rs6JE`, description: `Jeff had one of the most unique and beautiful touches on the instrument.`, name: `Jeff Beck`},
    {id: `fMdmjoAB-5Q`, description: `Thin Lizzy's guitarists trade solos at the end of one of my favorite Thin Lizzy songs.`, name: `Scott Gorham and Brian Robertson`},
    {id: `aC5806zO_p8`, description: `Michael Schenker was the brother of Scorpions guitarist Rudolf Schenker. The solo in Rock Bottom is one of my favorite guitar solos of all time.`, name: `Michael Schenker`},
    {id: `XJMgveYdO-M`, description: `One of the early pioneers of metal, I consider Judas Priest part of the classic rock canon.`, name: `Glenn Tipton and K.K. Downing`},
    {id: `S0kTkxhyWNo`, description: `Brian May has an instantly recognizable style. He built his guitar called "The Red Special" with his father.`, name: `Brian May`},
    {id: `gmhpBMn8QTA`, description: `Lukather is most well known for his work with Toto, but he is also a prolific session musician.`, name: `Steve Lukather`},
    {id: `Wu4_zVxmufY`, description: `Though he's not as technically accomplished as other guitarists on this list, I wanted to include Springsteen because he's a great songwriter.`, name: `Bruce Springsteen` },
    {name: `Mark Knopfler`, description: `Mark Knopfler was the frontman of Dire Straits. The song Sultans of Swing was written after he saw a mediocre jazz band perform.`, id: `YyF1FwiYcoQ`},
    {name: `Gary Moore`, description: `Though he was also in Thin Lizzy, Gary is known more for his solo work.`, id: `4O_YMLDvvnw`},
    {name: `George Harrison`, description: `The guitarist for the Beatles, George bloomed into one of the best songwriters.`, id: `UelDrZ1aFeY`},
    {name: `Pete Townshend`, description: `Pete is known more for his stage presence and songwriting rather than his technical ability.`, id: `gDbAtWpoA6k`},
    {name: `Steve Howe`, description: `I first heard Yes when my dad bought the Fragile CD and kept bothering me to listen to it.`, id:`qGIMmjDQ70o`},
    {name: `Andy Summers`, description:`The guitarist for the Police, Andy brought unique chordal choices to the mix.`, id: `aENX1Sf3fgQ`},
    {name: `Neal Schon`, description: `Though Journey is mostly known for Steve Perry's vocals, Neal's guitar playing was an integral part of their sound.`, id: `LatorN4P9aA`},
    {name: `Daryl Stuermer`, description: `Mostly affiliated with Phil Collins, Daryl is his main guitar player.`, id: `JkRKT6T0QLg`},
    {name: `Steve Hackett`, description: `Also affiliated with Phil Collins, but during his years in Genesis Steve Hackett takes a monstrous solo on this song.`, id: `Rz-tHZEr37I`},
    {name: `Jimmy Page`, description: `Jimmy Page wrote many of the most iconic riffs and solos of all time.`, id: `2KPEHohJMuw`},
    {name: `Adrian Belew`, description: `Adrian has played with many of my favorite artists - Frank Zappa, David Bowie, King Crimson, and Talking Heads.`,id: `Mmp5jAKpyns`},
    {name: `Randy Rhoads`, description: `During Randy's short career he created some of the most memorable guitar solos of all time.`, id: `DnueGxT8XUk`},
    {name: `Robby Krieger`, description: `The guitarist for the doors, he played fingerstyle.`, id: `YPooVj7MQ6E`},
    {name: `Larry Cartlon`, description: `Not known as a member of any band, Larry is one of the most well known session musicians.`, id:`b00h8iKaklQ`}
  ]
</script>

<SitePage
        title='Classic Rock Guitarists'
>
    <Section theme="tertiary">
        {#each guitarists as { id, description, name }, i}
            <div class="mb-12 rounded bg-blue-100 p-2 shadow sm:p-6 md:max-w-3/4">
                <h1 class="text-primary-dark text-2xl font-extrabold mb-2">{i+1}) {name}</h1>
                <p class="mb-5">{description}</p>
                <Youtube {id}></Youtube>
            </div>
        {/each}
    </Section>
</SitePage>
