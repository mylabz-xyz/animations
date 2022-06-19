#ifdef GL_ES
precision highp float;
#endif

#define PI2 6.28318530718
#define MAX_ITER 5

uniform float uTime;
uniform vec2 uResolution;
uniform float spectrum;


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float uTime = uTime * .1;
    vec2 uv = fragCoord.xy / uResolution.xy;

    vec2 p = mod(uv * PI2, PI2) - 100.0  ;
    vec2 i = vec2(p);
    float c = 0.5;
    float inten =  .0094;

    for (int n = 0; n < MAX_ITER; n++) {
        float t = uTime * (1.5 - (2.2 / float(n + 122)));
        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
        c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten + spectrum), p.y / (cos(i.y + t) / inten)));
    }

    c /= float(MAX_ITER);
    c = 1.10-pow(c, 1.26);
    vec3 colour = vec3(0.098+pow(abs(c), 0.2), 0.098+pow(abs(c), 0.2), .098+pow(abs(c), 0.2));

    fragColor = vec4(colour, 1.3);
}


void main( void ) {
    mainImage(gl_FragColor, gl_FragCoord.xy);}