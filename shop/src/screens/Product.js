import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useProducts } from "../context/ProductsContext";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from "../theme";

const Product = ({ route }) => {
  const { products } = useProducts();
  const id = route.params.id;
  const product = products.find((p) => p._id == id);

  if (!product) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>Product Not Found</Text>
        <Text style={styles.emptySubtitle}>
          This product may no longer be available
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.md,
  },
  header: {
    gap: SPACING.md,
  },
  name: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.text,
  },
  priceBadge: {
    backgroundColor: COLORS.success + "15",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignSelf: "flex-start",
  },
  priceLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: "600",
    color: COLORS.success,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  price: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.success,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
  },
  section: {
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    lineHeight: 24,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});

export default Product;
