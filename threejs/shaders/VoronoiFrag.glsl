uniform vec2 seeds[32];
uniform vec3 colors[32];

void main() {
    float dist = distance(seeds[0], gl_FragCoord.xy);
    vec3 color = colors[0];
    for (int i = 1; i < 32; i++) {
        float current = distance(seeds[i], gl_FragCoord.xy);
        if (current < dist) {
            color = colors[i];
            dist = current;
        }
    }
    gl_FragColor = vec4(color, 1.0);
}